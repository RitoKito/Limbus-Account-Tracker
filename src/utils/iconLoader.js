const iconMap = import.meta.glob('/src/assets/icons/**/*.png');

export const loadIcon = async (iconPath) => {
    const path = `/src/assets/icons/${iconPath}`
    const loader = iconMap[path];

    if(!loader) {
        console.warn(`Icon not found for path: ${path}`);
    }

    const module = await loader();
    return module.default;
}