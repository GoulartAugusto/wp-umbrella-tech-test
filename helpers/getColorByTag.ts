export const getColorByTag = (tag: string) => {
  if (tag === null) {
    return "#6B7280";
  }

  switch (tag) {
    case "blue":
      return "#3B82F6";
    case "red":
      return "#EF4444";
    case "yellow":
      return "#F59E0B";
    default:
      return "#6B7280"; // The default color required on README.md
  }
};

// At README.md have a requirement that says if a tag does not match with Blue, Red or Yellow
// the default background color should be grey (#6B7280). So this feature is now implemented