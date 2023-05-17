import {
  Building2,
  Check,
  ClipboardCheck,
  DollarSign,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const NAV_LINKS_PATH = {
  Dashboard: "/",
  Vendors: "/vendors",
  Programs: "/programs",
  TrainingAndCertification: "/training-certification",
  Payments: "/payments",
  Customers: "/customers",
};

export const NAV_LINKS = [
  { icon: LayoutDashboard, label: "Dashboard", to: NAV_LINKS_PATH.Dashboard },
  { icon: Building2, label: "Vendors", to: NAV_LINKS_PATH.Vendors },
  { icon: Check, label: "Programs", to: NAV_LINKS_PATH.Programs },
  {
    icon: ClipboardCheck,
    label: "Training & Certification",
    to: NAV_LINKS_PATH.TrainingAndCertification,
  },
  { icon: DollarSign, label: "Payments", to: NAV_LINKS_PATH.Payments },
  { icon: Users, label: "Customers", to: NAV_LINKS_PATH.Customers },
];
