import { NextResponse } from "next/server";
import { WeatherService } from "@/libs/services/weather-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ message: "Latitude e longitude inválidas." }, { status: 400 });
  }

  try {
    const [current, forecast] = await Promise.all([
      WeatherService.getCurrentByCoordinates(lat, lon),
      WeatherService.getForecastByCoordinates(lat, lon),
    ]);

    return NextResponse.json({ city: current.name, current, forecast });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro ao buscar clima por coordenadas.",
      },
      { status: 500 },
    );
  }
}
