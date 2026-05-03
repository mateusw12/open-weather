import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { GeocodingCityDto } from "@/libs/dto";
import {
  ActionButton,
  ErrorMessage,
  Hero,
  HeroChip,
  HeroChipGrid,
  SearchButton,
  SearchField,
  SearchRow,
  SearchWrap,
  SuggestionButton,
  SuggestionList,
} from "@/components/weather-shell/styled";

type HeroPanelProps = {
  city: string;
  temp: number;
  description: string;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  query: string;
  setQuery: (value: string) => void;
  suggestions: GeocodingCityDto[];
  isLoading: boolean;
  isLocating: boolean;
  errorMessage: string | null;
  onSubmitSearch: () => void;
  onUseCurrentLocation: () => void;
  onPickSuggestion: (label: string) => void;
  cityLabel: (city: GeocodingCityDto) => string;
};

export function HeroPanel({
  city,
  temp,
  description,
  feelsLike,
  minTemp,
  maxTemp,
  humidity,
  windSpeed,
  query,
  setQuery,
  suggestions,
  isLoading,
  isLocating,
  errorMessage,
  onSubmitSearch,
  onUseCurrentLocation,
  onPickSuggestion,
  cityLabel,
}: HeroPanelProps) {
  return (
    <Hero>
      <p>
        <FaMapMarkerAlt size={13} /> Agora em {city}
      </p>
      <h1>{Math.round(temp)}°</h1>
      <p>{description}</p>
      <p>Sensacao termica de {Math.round(feelsLike)}°</p>

      <HeroChipGrid>
        <HeroChip>
          <span>Semana</span>
          <strong>
            {minTemp}° / {maxTemp}°
          </strong>
        </HeroChip>
        <HeroChip>
          <span>Umidade</span>
          <strong>{humidity}%</strong>
        </HeroChip>
        <HeroChip>
          <span>Vento</span>
          <strong>{windSpeed.toFixed(1)} m/s</strong>
        </HeroChip>
      </HeroChipGrid>

      <SearchRow>
        <SearchWrap
          onSubmit={(event) => {
            event.preventDefault();
            onSubmitSearch();
          }}
        >
          <SearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Para onde vamos? Busque uma cidade"
            aria-label="Buscar cidade"
          />
          <SearchButton type="submit" aria-label="Pesquisar">
            <MagnifyingGlassIcon width={18} height={18} />
          </SearchButton>

          {suggestions.length > 0 && (
            <SuggestionList>
              {suggestions.map((item) => (
                <li key={`${item.lat}-${item.lon}`}>
                  <SuggestionButton
                    type="button"
                    onClick={() => {
                      const label = cityLabel(item);
                      setQuery(label);
                      onPickSuggestion(label);
                    }}
                  >
                    {cityLabel(item)}
                  </SuggestionButton>
                </li>
              ))}
            </SuggestionList>
          )}
        </SearchWrap>

        <ActionButton type="button" onClick={onSubmitSearch} disabled={isLoading}>
          Ver clima
        </ActionButton>

        <ActionButton type="button" onClick={onUseCurrentLocation} disabled={isLocating}>
          {isLocating ? "Buscando localizacao..." : "Usar minha localizacao"}
        </ActionButton>
      </SearchRow>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Hero>
  );
}
