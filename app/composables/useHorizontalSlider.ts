import { ref, onMounted, onBeforeUnmount } from "vue";

export function useHorizontalSlider() {
  const sliderRef = ref<HTMLElement | null>(null);

  const showLeftSliderArrow = ref(false);
  const showRightSliderArrow = ref(false);

  const updateArrowVisibility = () => {
    const slider = sliderRef.value;
    if (!slider) return;

    showLeftSliderArrow.value = slider.scrollLeft > 10;
    showRightSliderArrow.value =
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 10;
  };

  const scrollLeft = (amount = 300) => {
    sliderRef.value?.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const scrollRight = (amount = 300) => {
    sliderRef.value?.scrollBy({ left: amount, behavior: "smooth" });
  };

  onMounted(() => {
    if (!sliderRef.value) return;

    const handleScroll = () => updateArrowVisibility();
    const handleResize = () => updateArrowVisibility();

    sliderRef.value.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    updateArrowVisibility();

    onBeforeUnmount(() => {
      sliderRef.value?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    });
  });

  return {
    sliderRef,
    showLeftSliderArrow,
    showRightSliderArrow,
    scrollLeft,
    scrollRight,
  };
}
