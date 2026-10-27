import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ÍCONE DOS MARCADORES
const icone = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// ADICIONAR MARCADORES
function EventosMapa({ adicionarMarcador }) {
  useMapEvents({
    click(evento) {
      adicionarMarcador(
        evento.latlng.lat,
        evento.latlng.lng
      );
    }
  });

  return null;
}

// COMPONENTE PRINCIPAL
function Mapa({
  marcadores,
  selecionarLocal,
  adicionarMarcador,
  atualizarMarcador
}) {
  return (
    <div className="mapa-wrapper">

      <MapContainer
        center={[-7.5606, -35.0025]}
        zoom={13}
        minZoom={10}
        maxZoom={19}

        maxBounds={[
          [-7.85, -35.25],
          [-7.40, -34.60]
        ]}

        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}

        style={{
          height: "100%",
          width: "100%"
        }}
      >

        {/* CAMADA DO MAPA */}
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {/* ADICIONAR MARCADORES */}
        <EventosMapa
          adicionarMarcador={adicionarMarcador}
        />

        {/* MARCADORES */}
        {marcadores.map((marcador) => (
          <Marker
            key={marcador.id}

            position={[
              marcador.latitude,
              marcador.longitude
            ]}

            icon={icone}

            draggable={marcador.editando === true}

            eventHandlers={{
              click: () => {
                selecionarLocal(marcador.id);
              },

              dragend: (evento) => {
                if (!marcador.editando) return;

                const posicao =
                  evento.target.getLatLng();

                atualizarMarcador(marcador.id, {
                  latitude: posicao.lat,
                  longitude: posicao.lng
                });
              }
            }}
          />
        ))}

      </MapContainer>

    </div>
  );
}

export default Mapa;