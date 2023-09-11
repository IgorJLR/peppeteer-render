const puppeteer = require("puppeteer");
require("dotenv").config();
const fs = require('fs'); // Importa o módulo fs para leitura de arquivos
const { stringify } = require("querystring");
const caminhoArquivoJSON = "BD-Ambientes.json";

let chrome = {};
let quantidadeTurmas = 0;

let ultimaConsulta = {
  turma: 'asd',
  horario: 'asd',
  disciplina: 'asd',
  professores: 'asd',
  salas: 'asd',
  dia: 'asd',
};

let horariosJsonFinal = {}

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    let page = await browser.newPage();
    const pageBody = await page.$('body');
    const pageBodyHeight = await pageBody.boundingBox();

    await page.setViewport({
      width: 1920,
      height: 1080
    })
    await page.setDefaultNavigationTimeout(0);

    let salasUnicas = []

    for (let i = 2; i <= 1000; i++) {

      console.log("Lendo turma", i, ".");
      await page.goto(`https://ifc-camboriu.edupage.org/timetable/view.php?num=223&class=*${i}`, { waitUntil: 'load', timeout: 0 });

      await page.waitForSelector('svg')
      const cellsHandles = await page.$$('svg rect');

      const horariosHandles = await page.$$('svg text');

      const lineHandles = await page.$$('svg line')

      const svg = await page.$('svg');
      //console.log(await svg.boundingBox())
      const svgWidth = await svg.evaluate(x => x.getAttribute('width'))
      //console.log({svgHeigh});
      let svgTitle = ""


      let cells = [];
      let horarios = [];
      let semana = []
      let horariosComeco = 0.0
      let horariosFim = 0.0
      async function buildReturn(object, y, x, height, title, width) {
        object.push({
          name: `${title}`,
          posX: `${x}`,
          posY: `${y}`,
          itemHeight: `${height}`,
          itemWidth: `${width}`
        })
      }

      // TOALETE


      for (let t of cellsHandles) {
        let y = await t.evaluate(x => x.getAttribute('y'));
        let x = await t.evaluate(x => x.getAttribute('x'));
        let height = await t.evaluate(x => x.getAttribute('height'));
        let title = await t.evaluate(x => x.textContent);
        let width = await t.evaluate(x => x.getAttribute('width'));
        if (title != '') { buildReturn(cells, y, x, height, title, width) }
      }

      const padrao = new RegExp(/\d{1,2}:\d{2} - \d{1,2}:\d{2}/);
      const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab",]

      let countT = 0

      for (let t of horariosHandles) {
        let y = await t.evaluate(x => x.getAttribute('y'));
        let x = await t.evaluate(x => x.getAttribute('x'));
        let height = await t.evaluate(x => x.getAttribute('height'));
        let title = await t.evaluate(x => x.textContent);
        if (countT == 0) { svgTitle = title };
        if (padrao.test(title)) { buildReturn(horarios, y, x, height, title) };
        countT += 1
      }

      for (let t of horariosHandles) {
        let y = await t.evaluate(x => x.getAttribute('y'));
        let x = await t.evaluate(x => x.getAttribute('x'));
        let height = await t.evaluate(x => x.getAttribute('height'));
        let title = await t.evaluate(x => x.textContent);


        if (diasSemana.includes(title)) { buildReturn(semana, y, x, height, title) };
      }

      let lineWidth = 0.0
      let comecoY = 100000
      let finalY = -100000.0
      let prev = -10000.0

      for (let t of lineHandles) {

        let y = await t.evaluate(x => parseFloat(x.getAttribute('y1')));
        let x1 = await t.evaluate(x => parseFloat(x.getAttribute('x1')));
        let x2 = await t.evaluate(x => parseFloat(x.getAttribute('x2')));

        dist = Math.sqrt(Math.pow(x2 - x1, 2))

        let compare = await y > finalY

        if (compare) finalY = y;
        prev = y
        if (dist > lineWidth && y < comecoY) { lineWidth = dist; comecoY = y }

      }
      comecoY = prev

      let tableHeight = finalY - comecoY

      let cellHeight = tableHeight / horarios.length;

      let avaliableCells = []

      let rangeHorarios = []

      let countH = 0

      for (let c of horarios) {

        rangeHorarios.push({
          name: `${c.name}`,
          posYI: `${comecoY + (countH * cellHeight)}`,
          posYF: `${(comecoY + (countH * cellHeight)) + cellHeight}`,

        })

        countH += 1

      }

      for (let c of cells) {
        let menorI = Infinity;
        let menorF = Infinity;
        let horaI = '';
        let horaF = '';

        for (let h of rangeHorarios) {
          let difI = Math.abs(parseFloat(h.posYI) - parseFloat(c.posY));
          //abs( dicionario_horarios[h][0] - ((cell.location['y']-135)))
          let difF = Math.abs(parseFloat(h.posYF) - (parseFloat(c.posY) + parseFloat(c.itemHeight)))
          //dicionario_horarios[h][1] - ((cell.location['y']-135) + cell.size['height'])

          //console.log(h.posYF,c.posY,c.itemHeight,difF);

          if (difI < menorI) {
            menorI = difI;
            horaI = `${h.name.substring(0, 5).trim()}`;
          }

          if (difF < menorF) {
            menorF = difF;
            horaF = `${h.name.slice(-5).trim()}`;
          }
        }

        let menorDif = Infinity;
        let diaMaisProximo = '';

        for (let d of semana) {
          let dif = (d.posX - (c.itemWidth / 2)) - (c.posX);
          dif = Math.abs(dif)

          if (dif < menorDif) {
            menorDif = dif;
            diaMaisProximo = d.name;
          }
        }

        c.horaI = horaI;
        c.horaF = horaF;
        c.dia = diaMaisProximo;
      }

      for (let c of cells) {

        let disciplina = ''
        let professores = []
        let salas = []

        let dados = c.name.split("\n")
        let salasS = []

        if (dados.length > 2) {
          disciplina = dados[0];
          professores = dados[1];
          salas = dados[2];

          let professoresS = professores.split("/")

          professoresS = professoresS.map(elemento => {
            const palavras = elemento.split(',').map(palavra => palavra.trim().replace(/\s+/g, ''));
            return palavras;
          });

          salasS = salas.split("/")

          salasS.map(elemento => elemento.trim());
          

          for (let s of salasS) {
            if (!salasUnicas.includes(s.trim())) {

              salasUnicas.push(s.trim())
              console.log(salasUnicas);

            }
          }
          let salasNoDUp = [...new Set(salasUnicas)];
          salasUnicas = salasNoDUp
          //console.log((cells[cells.length -1]));
          


          if (c == cells[cells.length - 1]) {
            if (svgTitle == ultimaConsulta.turma) {
              console.log(horariosJsonFinal);
              for (let s of salasUnicas) {
                horariosJsonFinal[`${s}`] = {
                  nomes:[s],
                  latitude:'',
                  longitude:'',
                  descricao:'',
                  categoria:'',
                  andar:'',
                  bloco:'',
                  imagens:[],
                  turmas: {}
                }
              }
              res.send(horariosJsonFinal)
              validacao = false
              console.log("Executado com sucesso.");
              i = 1000
              return
            }
            ultimaConsulta = {
              turma: `${svgTitle}`,
              horario: `${[c.horaI, c.horaF]}`,
              disciplina: `${disciplina}`,
              professores: `${professoresS}`,
              salas: `${salasS}`,
              dia: `${c.dia}`
            }
          }

          
        }
      }
    }
    for (let s of salasUnicas) {
      horariosJsonFinal[`${s}`] = {
        nomes:[s],
        latitude:'',
        longitude:'',
        descricao:'',
        categoria:'',
        andar:'',
        bloco:'',
        imagens:[],
        turmas: {}
      }
    }
    res.send(horariosJsonFinal)
    console.log(horariosJsonFinal);



  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
