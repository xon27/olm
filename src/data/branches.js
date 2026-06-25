const mapsEmbed = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=17&output=embed`

export const branches = [
  {
    city: 'Pasay',
    address: '3rd Floor #47 Brgy10 FB Harrison Corner Sta. Monica Street Pasay City',
    mapUrl: mapsEmbed('47 FB Harrison Corner Sta Monica Street Pasay City'),
    mapsLink: 'https://maps.app.goo.gl/S4XS8XDf4UZkPTZq9',
  },
  {
    city: 'Iloilo City',
    address: "2F Unit F Sister's Link Bldg. Ledesma St., Brgy. Hipodromo Iloilo City",
    mapUrl: mapsEmbed("Sister's Link Landmark Ledesma St Brgy Hipodromo Iloilo City"),
    mapsLink: 'https://www.google.com/maps/place/Toolmate+Merchandising/@10.6944569,122.5624214,6a,75y,336.27h,96.14t/data=!3m7!1e1!3m5!1swf5KSSp3KwTA4PhOSjVoXA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-6.140000000000001%26panoid%3Dwf5KSSp3KwTA4PhOSjVoXA%26yaw%3D336.27!7i16384!8i8192!4m7!3m6!1s0x33aee567065f74f9:0xc6ae8df624954fc0!8m2!3d10.694518!4d122.5621921!10e5!16s%2Fg%2F11csq284qt?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D',
    mapLabel: "Sister's link Landmark",
  },
]
