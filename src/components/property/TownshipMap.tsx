'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { properties } from '@/content/properties';

export default function TownshipMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Center map around the Panvel growth corridor where all townships are located
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false, // Prevent page scroll hijacking
    }).setView([18.92, 73.22], 11);
    
    mapInstance.current = map;

    // Define clean Voyager base layer
    const voyagerLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    // Google Roadmap layer showing detailed local infrastructure, roads, rails, schools, hospitals
    const googleRoadmap = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps',
      maxZoom: 20
    });

    // Google Satellite Hybrid layer showing actual ground satellite images combined with names/roads
    const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps',
      maxZoom: 20
    });

    // OpenStreetMap Standard layer as an alternative open-source detailed roadmap
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    // Add default base layer (Voyager)
    voyagerLayer.addTo(map);

    // Group the layers to expose them in the Layer Switcher control UI
    const baseMaps = {
      "Clean Map": voyagerLayer,
      "Google Maps (Infra)": googleRoadmap,
      "Google Satellite": googleHybrid,
      "OpenStreetMap": osmLayer
    };

    // Add layer switcher control in the top-right corner
    L.control.layers(baseMaps, undefined, { position: 'topright' }).addTo(map);

    // Add markers for all published townships
    properties.forEach((p) => {
      if (p.published && p.location.lat && p.location.lng) {
        const sectorPrefix = p.location.sector ? `${p.location.sector}, ` : '';
        const locationStr = `${sectorPrefix}${p.location.landmark}`;
        
        // Find plot size range text
        const sizes = p.plotSizes.map((s) => s.sqft);
        const minSize = Math.min(...sizes);
        const maxSize = Math.max(...sizes);
        const sizeStr = minSize === maxSize ? `${minSize} sq ft` : `${minSize} - ${maxSize} sq ft`;

        // Create a custom label for the township (e.g. "Sankalp", "Bliss", etc.)
        const shortName = p.name.replace('The ', '').replace('Riyasat ', '');

        // Custom DivIcon utilizing SVG styled with the active design colors:
        // Canopy/Ink: #0B1F33, Sprout: #C9A45C, Paper: #F4EBDD
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="flex flex-col items-center justify-center">
              <div class="w-8 h-8 rounded-full bg-[#0B1F33] border-2 border-white flex items-center justify-center shadow-lg text-[#C9A45C]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.54 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="w-2.5 h-2.5 bg-[#0B1F33] rotate-45 -mt-1 shadow-md"></div>
              
              <!-- Direct Township Label -->
              <div class="mt-1 px-2 py-0.5 bg-[#0B1F33]/90 border border-[#DDD1BC]/65 text-[#F4EBDD] rounded text-[10px] font-sans font-bold whitespace-nowrap shadow-md backdrop-blur-xs">
                ${shortName}
              </div>
            </div>
          `,
          iconSize: [120, 65],
          iconAnchor: [60, 42],
          popupAnchor: [0, -42]
        });

        const marker = L.marker([p.location.lat, p.location.lng], { icon: customIcon }).addTo(map);
        
        // Popup layout using Tailwind utility classes
        const popupContent = `
          <div class="p-4 font-sans max-w-[240px]">
            <h4 class="font-display font-bold uppercase tracking-tight text-[#0B1F33] text-sm mb-1">
              ${p.name}
            </h4>
            <p class="text-[11px] text-[#5C6F80] font-medium leading-normal mb-2">
              ${locationStr}
            </p>
            <div class="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-[#DDD1BC]/50">
              <span class="text-[11px] font-mono text-[#C9A45C] font-bold">
                ${sizeStr}
              </span>
              <a href="/properties/${p.node}/${p.slug}" class="text-[11px] font-mono font-bold uppercase text-[#0B1F33] hover:text-[#C9A45C] transition-colors" target="_blank">
                Details →
              </a>
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent, {
          closeButton: false,
          className: 'custom-leaflet-popup'
        });
      }
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full min-h-[400px] bg-[#FAF5ED]" />
  );
}
