import Chatbot from "./ChatBot";



export default function Home(){
    const locationHardCoded = {
  "status": true,
  "message": "POIs and geocodes extracted successfully.",
  "data": {
    "poi": [
      "Rajwada Palace, Indore, India",
      "Kanch Mandir, Indore, India",
      "Lal Bagh Palace, Indore, India",
      "Indore Central Museum (Gandhi Hall), Indore, India",
      "Sarafa Bazaar Food Street, Indore, India",
      "Annapurna Temple, Indore, India",
      "Bada Ganpati Temple, Indore, India",
      "Pipliyapala Regional Park (Atal Bihari Vajpayee Regional Park), Indore, India",
      "Kothari Market, Indore, India",
      "M.T. Cloth Market, Indore, India",
      "Chappan Dukan (56 Shops), Indore, India",
      "Krishnapura Chhatris, Indore, India",
      "Gomatgiri, Indore, India",
      "Shreemaya Celebrity, Indore, India",
      "Nafees Restaurant, Indore, India"
    ],
    "geocodes": [
      {
        "place": "Rajwada Palace, Indore, India",
        "lat": "22.7184344",
        "lon": "75.8547755"
      },
      {
        "place": "Kanch Mandir, Indore, India",
        "lat": "22.7163957",
        "lon": "75.8492080"
      },
      {
        "place": "Lal Bagh Palace, Indore, India",
        "lat": "22.7025398",
        "lon": "75.8467893"
      },
      {
        "place": "Indore Central Museum (Gandhi Hall), Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Sarafa Bazaar Food Street, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Annapurna Temple, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Bada Ganpati Temple, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Pipliyapala Regional Park (Atal Bihari Vajpayee Regional Park), Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Kothari Market, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "M.T. Cloth Market, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Chappan Dukan (56 Shops), Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Krishnapura Chhatris, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Gomatgiri, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Shreemaya Celebrity, Indore, India",
        "lat": null,
        "lon": null
      },
      {
        "place": "Nafees Restaurant, Indore, India",
        "lat": "22.7257453",
        "lon": "75.8883492"
      }
    ]
  }
}

    return(<div>
        <Chatbot />
    </div>);
}