import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "AMOTAX-Projecto-Piloto.docx");

const h1 = (text) =>
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, bold: true })] });
const h2 = (text) =>
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, bold: true })] });
const p = (text) => new Paragraph({ children: [new TextRun({ text })] });
const bullet = (text) =>
  new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text })] });

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Ubuntu", size: 22 } },
    },
  },
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "AMOTAX", bold: true, size: 48, color: "E85D04" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Associação Moçambicana de Moto Tax",
              size: 28,
              color: "0B2E4A",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "Documento de projecto — Fase piloto (aplicativo móvel)",
              italics: true,
              size: 24,
            }),
          ],
        }),
        p("Data: Junho 2026"),
        p("Versão: 1.0 — Piloto"),
        new Paragraph({ spacing: { before: 300 } }),

        h1("1. Resumo executivo"),
        p(
          "A AMOTAX necessita de uma plataforma centrada no telemóvel para cadastro de mototaxistas, pagamento de cotas mensais simbólicas, comunicação por SMS e convites a reuniões. O piloto começa pelo aplicativo móvel; o site institucional fica para fase posterior.",
        ),
        p(
          "Identidade visual do piloto: laranja (#E85D04) e azul escuro (#0B2E4A) como cores principais, com derivações; tipografia Ubuntu.",
        ),

        h1("2. Problema e objectivos"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [p("Situação")],
                  shading: { fill: "0B2E4A" },
                }),
                new TableCell({ children: [p("Objectivo")] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [p("Mototaxistas na rua, sem computador")] }),
                new TableCell({ children: [p("App Android/iOS (prioridade Android)")] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [p("Lista de membros dispersa")] }),
                new TableCell({ children: [p("Cadastro com validação por telefone (OTP)")] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [p("Cotas difíceis de cobrar")] }),
                new TableCell({ children: [p("Pagamento M-Pesa / e-Mola ou comprovativo no piloto")] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [p("Comunicação ineficaz")] }),
                new TableCell({ children: [p("SMS + notificações push + avisos no app")] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [p("Baixa presença em reuniões")] }),
                new TableCell({ children: [p("Convites com confirmação (vou / não vou)")] }),
              ],
            }),
          ],
        }),

        h1("3. Utilizadores"),
        bullet("Membro: registo, cotas, avisos, reuniões, cartão digital com QR"),
        bullet("Administrador: aprovar membros, avisos, reuniões, SMS, relatórios de cota"),
        bullet("Super-admin: valor da cota, zonas, utilizadores admin"),

        h1("4. Funcionalidades — MVP (piloto)"),
        h2("4.1 Registo"),
        bullet("Nome, telefone (conta), zona de operação"),
        bullet("OTP por SMS (simulado no piloto; integração real em produção)"),
        bullet("Estados: pendente → activo"),
        h2("4.2 Cotas"),
        bullet("Valor configurável (ex.: 50–200 MT)"),
        bullet("Histórico mensal; estado pago / em falta"),
        bullet("Pagamento: M-Pesa (fase 3) ou comprovativo com foto (piloto)"),
        h2("4.3 Comunicados e SMS"),
        bullet("Lista de avisos no app"),
        bullet("Registo de envio SMS com opt-in no registo"),
        h2("4.4 Reuniões"),
        bullet("Data, local, pauta; push/SMS; RSVP (confirmo / não posso)"),
        h2("4.5 Admin"),
        bullet("Lista de membros, filtros, criar aviso e reunião"),

        h1("5. Arquitectura técnica"),
        bullet("App: React Native + Expo (TypeScript)"),
        bullet("Persistência piloto: armazenamento local + camada API preparada"),
        bullet("Backend futuro: Node + PostgreSQL (Supabase ou servidor próprio)"),
        bullet("Auth: telefone + OTP + JWT"),
        bullet("Push: Firebase Cloud Messaging"),
        bullet("SMS: provedor Moçambique (Africa's Talking, Twilio, ou operador local)"),
        bullet("Pagamentos: Vodacom M-Pesa / Movitel e-Mola"),

        h1("6. Modelo de dados"),
        p("Tabelas principais: members, zones, dues, payments, announcements, meetings, meeting_rsvps, sms_log, admins."),
        p("Regra: um telefone = uma conta; uma cota por membro por mês; SMS com log e opt-in."),

        h1("7. Roadmap"),
        bullet("Fase 0 (1–2 sem): requisitos, zona piloto, provedor SMS"),
        bullet("Fase 1 (4–6 sem): MVP app — este repositório mobile/"),
        bullet("Fase 2 (4–8 sem): piloto 50–200 membros"),
        bullet("Fase 3: pagamentos automáticos M-Pesa"),
        bullet("Fase 4: site institucional e relatórios"),

        h1("8. Segurança e privacidade"),
        bullet("HTTPS, rate limit OTP, consentimento SMS"),
        bullet("Admin com proteção de sessão; backups diários em produção"),
        bullet("Não partilhar dados de membros com terceiros"),

        h1("9. Estrutura do repositório"),
        p("/Users/macbook/Desktop/APP/Amotax/"),
        bullet("AMOTAX-Projecto-Piloto.docx — este documento"),
        bullet("Ubuntu/ — fontes do projecto"),
        bullet("mobile/ — aplicativo Expo AMOTAX"),
        bullet("README.md — instruções de execução"),

        h1("10. Decisões em aberto"),
        bullet("Cidade/província do piloto"),
        bullet("Valor exacto da cota simbólica"),
        bullet("Aprovação manual vs automática após OTP"),
        bullet("Contrato M-Pesa vs só comprovativo no piloto"),

        new Paragraph({ spacing: { before: 400 } }),
        p("— Documento gerado para a Associação Moçambicana de Moto Tax (AMOTAX)."),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log("Written:", outPath);
