export interface weather {
  _id: string
  weather: Weather[]
  main: Main
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  dt_txt: string
  visibility: number
  pop: number
  cityId: string
  __v: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
  _id: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
  temp_kf: number
  _id: string
}

export interface Wind {
  speed: number
  deg: number
  gust: number
  _id: string
}

export interface Clouds {
  all: number
  _id: string
}

export interface Sys {
  pod: string
  _id: string
}