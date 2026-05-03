import { NextResponse } from "next/server";
import { withProtectedRoute } from "@/libs/auth/route-auth";
import { WeatherService } from "@/libs/services/weather-service";

export const GET = withProtectedRoute(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ cities: [] });
  }

  try {
    const cities = await WeatherService.suggestCities(query, 7);
    return NextResponse.json({ cities });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro ao buscar sugestões de cidades.",
      },
      { status: 500 },
    );
  }
});
