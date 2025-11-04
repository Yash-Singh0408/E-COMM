import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    collection: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // ✅ Updated data based on your product.data.js
  const categories = [
    "Top Wear",
    "Bottom Wear",
    "Outerwear",
    "Footwear",
    "Accessories",
    "Athleisure",
  ];

  const genders = ["Men", "Women", "Unisex"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
    "Brown",
    "Olive",
    "Mustard",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Polyester",
    "Denim",
    "Wool",
    "Silk",
    "Linen",
    "Viscose",
    "Leather",
    "Nylon",
  ];

  const brands = [
    "NovaWear",
    "VelvetPeak",
    "BoldNove",
    "CoreStreet",
    "Modeify",
    "EchoLane",
    "Trendora",
    "Luxora",
    "UrbanThread",
  ];

  const collections = [
    "Casual Street",
    "Winter Vibes",
    "Denim Collection",
    "Vacation Wear",
    "Activewear",
    "Urban Essentials",
    "Formal Fits",
  ];

  const colorMap = {
    Red: "#FF4136",
    Blue: "#0074D9",
    Black: "#000000",
    Green: "#228B22",
    Yellow: "#FFD700",
    Gray: "#808080",
    White: "#FFFFFF",
    Pink: "#FFC0CB",
    Beige: "#F5F5DC",
    Navy: "#001f3f",
    Brown: "#8B4513",
    Olive: "#808000",
    Mustard: "#E1AD01",
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      collection: params.collection ? params.collection.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    // Handle checkbox filters (size, material, brand, collection)
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    }
    // Handle radio-like filters that should be toggleable
    else if (name === "category" || name === "gender") {
      newFilters[name] = filters[name] === value ? "" : value;
    }
    // Handle color (toggle)
    else if (name === "color") {
      newFilters[name] = filters.color === value ? "" : value;
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      collection: [],
      minPrice: 0,
      maxPrice: 1000,
    });
    setPriceRange([0, 1000]);
    setSearchParams(new URLSearchParams());
    navigate("");
  };

  const hasActiveFilters =
    filters.category ||
    filters.gender ||
    filters.color ||
    filters.size.length > 0 ||
    filters.material.length > 0 ||
    filters.brand.length > 0 ||
    filters.collection.length > 0 ||
    filters.maxPrice !== 1000;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="p-6 h-full bg-[var(--color-bg)] border-r border-[var(--color-border)] overflow-y-auto custom-scroll"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] tracking-wide">
          FILTERS
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-[var(--color-accent)] hover:opacity-80 transition-colors font-medium tracking-wide"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* CATEGORY */}
        <FilterSection title="CATEGORY">
          {categories.map((category) => (
            <RadioOption
              key={category}
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              label={category}
            />
          ))}
        </FilterSection>

        {/* GENDER */}
        <FilterSection title="GENDER">
          {genders.map((gender) => (
            <RadioOption
              key={gender}
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              label={gender}
            />
          ))}
        </FilterSection>

        {/* COLOR */}
        <FilterSection title="COLOR">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                name="color"
                value={color}
                onClick={() =>
                  handleFilterChange({
                    target: { name: "color", value: color },
                  })
                }
                title={color}
                className={`relative w-9 h-9 rounded-sm border-2 transition-all hover:scale-110 ${
                  filters.color === color
                    ? "border-[var(--color-accent)] scale-110"
                    : "border-[var(--color-border)]"
                }`}
                style={{ backgroundColor: colorMap[color] }}
              >
                {filters.color === color && (
                  <Check
                    className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    strokeWidth={3}
                  />
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* SIZE */}
        <FilterSection title="SIZE">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <CheckboxOption
                key={size}
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                label={size}
              />
            ))}
          </div>
        </FilterSection>

        {/* MATERIAL */}
        <FilterSection title="MATERIAL" scroll>
          {materials.map((material) => (
            <CheckboxOption
              key={material}
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              label={material}
            />
          ))}
        </FilterSection>

        {/* BRAND */}
        <FilterSection title="BRAND" scroll>
          {brands.map((brand) => (
            <CheckboxOption
              key={brand}
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              label={brand}
            />
          ))}
        </FilterSection>

        {/* COLLECTION */}
        <FilterSection title="COLLECTION" scroll>
          {collections.map((collection) => (
            <CheckboxOption
              key={collection}
              name="collection"
              value={collection}
              checked={filters.collection.includes(collection)}
              onChange={handleFilterChange}
              label={collection}
            />
          ))}
        </FilterSection>

        {/* PRICE */}
        <FilterSection title="PRICE RANGE">
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] bg-[var(--color-bg-highlight)]"
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${priceRange[1]}%, var(--color-bg-highlight) ${priceRange[1]}%, var(--color-bg-highlight) 100%)`,
            }}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-[var(--color-text-secondary)]">
              $0
            </span>
            <span className="text-sm font-semibold text-[var(--color-accent)]">
              ${priceRange[1]}
            </span>
          </div>
        </FilterSection>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;

/* ---------- Reusable Subcomponents ---------- */

const FilterSection = ({ title, children, scroll = false }) => (
  <div
    className={`pb-6 border-b border-[var(--color-border)] ${
      scroll ? "max-h-48 overflow-y-auto custom-scroll" : ""
    }`}
  >
    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3 tracking-wide">
      {title}
    </label>
    {children}
  </div>
);

const RadioOption = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer group space-x-2">
    <input
      type="radio"
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
      className="sr-only"
    />
    <span
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
        checked
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
          : "border-[var(--color-border)] group-hover:border-[var(--color-accent)]"
      }`}
    >
      {checked && (
        <span className="w-2 h-2 bg-[var(--color-bg)] rounded-full" />
      )}
    </span>
    <span
      className={`text-sm transition-colors ${
        checked
          ? "text-[var(--color-text-primary)] font-medium"
          : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
      }`}
    >
      {label}
    </span>
  </label>
);

const CheckboxOption = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer group">
    <input
      type="checkbox"
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
      className="sr-only"
    />
    <span
      className={`w-4 h-4 rounded-sm border-2 mr-3 flex items-center justify-center transition-all ${
        checked
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
          : "border-[var(--color-border)] group-hover:border-[var(--color-accent)]"
      }`}
    >
      {checked && (
        <Check className="w-3 h-3 text-[var(--color-bg)]" strokeWidth={3} />
      )}
    </span>
    <span
      className={`text-sm transition-colors ${
        checked
          ? "text-[var(--color-text-primary)] font-medium"
          : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
      }`}
    >
      {label}
    </span>
  </label>
);
