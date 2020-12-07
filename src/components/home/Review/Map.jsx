import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";

// Coords of the United States
const initialView = [37.6, -95.665];
const accessToken = "pk.eyJ1IjoibHVpc2d1dmUiLCJhIjoiY2toYW4yYXM4MDRndzJ3cXA2a29vdHN6YiJ9.P2WIRXmtlkXYKqTtO-pHsA";
const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;

const Map = (props) => {
	const markers = props.markerLocations.map((m, idx) => {
		return (
			<Marker position={m.coords} key={idx}>
				<Popup>
					<MarkerPopup {...m.userReviews} {...m.businessReviews}/>
				</Popup>
			</Marker>
		);
	});
	return (
		<div className="map">
		<MapContainer center={initialView} zoom={4} >
			<TileLayer
			attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
			url={url}
			/>
			{markers}
		</MapContainer>
		</div>
	);
}

export default Map;