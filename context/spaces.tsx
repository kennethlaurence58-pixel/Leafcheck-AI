import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

type SpacesContextValue = {
  spaces: string[];
  plantsBySpace: Record<string, string[]>;
  addSpace: (name: string) => { ok: true } | { ok: false; message: string };
  addPlant: (space: string, name: string) => { ok: true } | { ok: false; message: string };
  archiveSpace: (name: string) => void;
  deleteSpace: (name: string) => void;
};

const SpacesContext = createContext<SpacesContextValue | null>(null);

export function SpacesProvider({ children }: PropsWithChildren) {
  const [spaces, setSpaces] = useState<string[]>(["Porch", "Garden", "Table"]);
  const [plantsBySpace, setPlantsBySpace] = useState<Record<string, string[]>>({ Porch:["Monstera"], Garden:["Snake Plant"], Table:["Basil"] });

  const value = useMemo<SpacesContextValue>(() => ({
    spaces,
    plantsBySpace,
    addSpace: (rawName) => {
      const name = rawName.trim().replace(/\s+/g, " ");
      if (!name) return { ok: false, message: "Enter a space name." };
      if (name.length > 10) return { ok: false, message: "Space names must be 10 characters or fewer." };
      if (spaces.some((space) => space.toLowerCase() === name.toLowerCase())) {
        return { ok: false, message: "That space already exists." };
      }
      setSpaces((current) => [...current, name]);
      return { ok: true };
    },
    addPlant: (space, rawName) => {
      const name = rawName.trim().replace(/\s+/g, " ");
      if (!name) return { ok: false, message: "Enter a plant name." };
      if (name.length > 10) return { ok: false, message: "Plant names must be 10 characters or fewer." };
      const plants = plantsBySpace[space] ?? [];
      if (plants.length >= 8) return { ok: false, message: "Each space can have a maximum of 8 plants." };
      if (plants.some((plant) => plant.toLowerCase() === name.toLowerCase())) {
        return { ok: false, message: "That plant already exists in this space." };
      }
      setPlantsBySpace((current) => ({ ...current, [space]: [...(current[space] ?? []), name] }));
      return { ok: true };
    },
    archiveSpace: (name) => {
      setSpaces((current) => current.filter((space) => space !== name));
      setPlantsBySpace((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    },
    deleteSpace: (name) => {
      setSpaces((current) => current.filter((space) => space !== name));
      setPlantsBySpace((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    },
  }), [spaces, plantsBySpace]);

  return <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>;
}

export function useSpaces() {
  const context = useContext(SpacesContext);
  if (!context) throw new Error("useSpaces must be used inside SpacesProvider");
  return context;
}
