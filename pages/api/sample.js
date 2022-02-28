// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      "title": "Замічено руз транкспорту",
      "text": "Громадяни помітили ворожого транкспорту в Харкові",
      "datetime": "2022-02-28T12:00+02:00",
      "url": "https://facebook.com",
      "geo_coordinates": [
          {
              "lat": 49.994507,
              "lon": 36.145742,
              "text": "Харківська область, Харкіський район, Харків"
          }
      ]
    },
  ])
}
