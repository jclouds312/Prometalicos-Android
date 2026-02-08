# SOFTGAN - App Movil

## Overview
App movil para SOFTGAN (softgan.com), empresa colombiana especializada en soluciones para la industria carnica, lactea y ganadera. Incluye catalogo de productos, servicios, contacto por WhatsApp y mas.

## Architecture
- **Frontend**: Expo React Native con Expo Router (file-based routing)
- **Backend**: Express.js en puerto 5000 (landing page y APIs)
- **State**: Local state con useState (no database needed for catalog app)
- **Styling**: React Native StyleSheet con tema personalizado verde/dorado

## Key Features
- **Inicio**: Hero con stats, categorias rapidas, acciones directas (WhatsApp, llamar, cotizar)
- **Productos**: Catalogo completo con 10 categorias y 35+ productos, busqueda y filtros
- **Detalle Producto**: Ficha tecnica con specs, caracteristicas, boton cotizar por WhatsApp
- **Servicios**: 6 servicios (venta, instalacion, mantenimiento, calibracion, asesoria, obra civil)
- **Contacto**: Formulario que envia por WhatsApp, botones rapidos de contacto, redes sociales

## Product Categories
1. Basculas Ganaderas (barras portatiles, plataformas, kits)
2. Basculas Camioneras (puente, modulares, pesaje por ejes)
3. Bretes y Jaulas (ganaderos, porcinas, mecanicas)
4. Clasificadora de Huevos
5. Mesa de Cirugia Bovina
6. Equipos de Ordeño
7. Equipo Esterilizador
8. Descremadores
9. Maquinaria para Alimento
10. Cuartos Frios y Plantas Industriales

## Contact Info
- WhatsApp: 316 326 3971
- Telefono: 301 105 7567
- Email: comercial@softgan.com
- Web: www.softgan.com
- Asesora: Carolina

## Tech Stack
- Expo SDK 54, React Native, TypeScript
- expo-router for navigation
- @expo-google-fonts/inter for typography
- expo-linear-gradient for gradients
- @expo/vector-icons (Ionicons) for icons
- expo-haptics for touch feedback

## File Structure
- app/(tabs)/ - Tab screens (index, products, services, contact)
- app/product/[id].tsx - Product detail screen
- constants/data.ts - All product and company data
- constants/colors.ts - Theme colors (green/gold Softgan theme)

## Workflows
- Start Backend: `npm run server:dev` (port 5000)
- Start Frontend: `npm run expo:dev` (port 8081)

## Recent Changes
- Feb 2026: Initial build with Softgan branding, full product catalog, services, contact form
