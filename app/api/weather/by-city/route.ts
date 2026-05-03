import { NextResponse } from "next/server";
import { WeatherService } from "@/libs/services/weather-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ message: "Cidade é obrigatória." }, { status: 400 });
  }

  try {
    const [current, forecast] = await Promise.all([
      WeatherService.getCurrentByCity(city),
      WeatherService.getForecastByCity(city),
    ]);

    return NextResponse.json({ city: current.name, current, forecast });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Erro ao buscar clima por cidade.",
      },
      { status: 500 },
    );
  }
}
