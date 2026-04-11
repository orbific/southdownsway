import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import sdwData from './sdw.json';
import PolylineComponent from './PolylineComponent';

// Fix for missing marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapPage: React.FC = () => {
    const storiesWithCoordinates = sdwData.stories.filter(
        story => story.latitude !== undefined && story.longitude !== undefined
    );

    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <MapContainer
                center={[50.91, -0.45]}
                zoom={9}
                minZoom={9}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {storiesWithCoordinates.map(story => (
                    <Marker
                        key={story.id}
                        position={[story.latitude, story.longitude]}
                    >
                        <Popup>
                            {story.URL ? (
                                <a href={story.URL} target="_blank" rel="noopener noreferrer">
                                    {story.title}
                                </a>
                            ) : (
                                <span>{story.title}</span>
                            )}
                        </Popup>
                    </Marker>
                ))}
                <PolylineComponent />
            </MapContainer>
        </div>
    );
};

export default MapPage;