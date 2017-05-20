module.exports = {
  general: {
    updateInterval: 15 * 1000  // Set to 15 seconds, 30 seconds by default.
  },
  buses: {
    count: 60  // Each bus lines will have 60 vehicles running in the same time.
  },
  districts: {
    yellow: [
      'AJYAD',
      'AT TAYSIR',
      "AZ ZAHRA'",
      'AL HINDAWIYYAH',
      'AL MANSUR',
      'AT TANDABAWI',
      'AL ANDALUS',
      'AL HUJUN',
      'AL JUMMAYZAH',
      'AS SULAYMANIYYAH',
      "AL JAMI'AH",
      'AL MURSALAT',
      "AL MA'ABDAH",
      'AR RAWDAH',
      'AR RAWABI',
      'AL MISFALAH',
      "ASH SHUHADA'",
      'AN NUZHAH',
      "AL 'ADL"
    ],
    red: [
      'ASH SHUBAIKAH',
      'JARWAL',
      'AL HAJLAH',
      'AL QARARAH AND AN NAQA',
      'HARAT AL BAB AND ASH SHAMIYYAH',
      "SHI'B AMIR AND SHI'B ALI",
      'AL AZIZIYYAH',
      'KUDY',
      'AN NUZHAH',
      'AL MURSALAT'
    ]
  }
};
