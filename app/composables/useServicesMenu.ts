export const useServicesMenu = () => {
  const activeIndex = useState<number | null>("activeService", () => 0);
  return { activeIndex };
};
