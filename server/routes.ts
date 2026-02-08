import type { Express } from "express";
import { createServer, type Server } from "node:http";

const categories = [
  { id: 'ganaderas', name: 'Basculas Ganaderas', productCount: 10 },
  { id: 'camioneras', name: 'Basculas Camioneras', productCount: 4 },
  { id: 'bretes', name: 'Bretes y Jaulas', productCount: 4 },
  { id: 'avicola', name: 'Clasificadora de Huevos', productCount: 2 },
  { id: 'cirugia', name: 'Mesa de Cirugia Bovina', productCount: 2 },
  { id: 'ordenos', name: 'Equipos de Ordeño', productCount: 3 },
  { id: 'esterilizador', name: 'Equipo Esterilizador', productCount: 2 },
  { id: 'descremador', name: 'Descremadores', productCount: 2 },
  { id: 'alimento', name: 'Maquinaria para Alimento', productCount: 3 },
  { id: 'frios', name: 'Cuartos Frios', productCount: 2 },
];

const services = [
  { id: 'venta', name: 'Venta de Equipos' },
  { id: 'instalacion', name: 'Instalacion y Montaje' },
  { id: 'mantenimiento', name: 'Mantenimiento y Soporte' },
  { id: 'calibracion', name: 'Calibracion de Basculas' },
  { id: 'asesoria', name: 'Asesoria Tecnica' },
  { id: 'obra-civil', name: 'Obra Civil' },
];

const companyInfo = {
  name: 'SOFTGAN',
  tagline: 'Soluciones para la Industria Carnica, Lactea y Ganadera',
  phone: '+57 301 105 7567',
  whatsapp: '+573163263971',
  email: 'comercial@softgan.com',
  website: 'www.softgan.com',
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/categories", (_req, res) => {
    res.json(categories);
  });

  app.get("/api/services", (_req, res) => {
    res.json(services);
  });

  app.get("/api/company", (_req, res) => {
    res.json(companyInfo);
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "SOFTGAN" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
