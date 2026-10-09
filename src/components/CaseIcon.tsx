import { Building2, BriefcaseMedical, CookingPot, Cpu, Factory, Forklift, HardHat, Landmark, Package, ShoppingCart, SprayCan, Truck, Users, Wrench } from "lucide-react";
import type { CaseIcon as Key } from "@/data/cases";

const MAP = { pot: CookingPot, cart: ShoppingCart, forklift: Forklift, wrench: Wrench, clinic: BriefcaseMedical, cosmetics: SprayCan, package: Package, worker: HardHat, building: Building2, factory: Factory, bank: Landmark, users: Users, cpu: Cpu, truck: Truck };

/** Линейная иконка отрасли для карточки кейса. */
export default function CaseIcon({ name, size = 44 }: { name: Key; size?: number }) {
  const I = MAP[name];
  return <I size={size} strokeWidth={1.4} aria-hidden="true" />;
}
