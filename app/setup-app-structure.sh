#!/usr/bin/env bash
set -euo pipefail

# Base is the directory this script lives in (i.e. app/src)
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1) Directories under app/src
dirs=(
  "$BASE/assets"
  "$BASE/layouts"
  "$BASE/pages"
  "$BASE/pages/About"
  "$BASE/pages/About/[robot]"
  "$BASE/pages/Shop"
  "$BASE/pages/Blog"
  "$BASE/pages/Errors"
  "$BASE/components"
  "$BASE/style"
)

# 2) Page & layout files
files=(
  "$BASE/main.tsx"
  "$BASE/App.tsx"
  "$BASE/layouts/Header.tsx"
  "$BASE/layouts/Footer.tsx"

  "$BASE/pages/Home.tsx"
  "$BASE/pages/About.tsx"
  "$BASE/pages/About/Index.tsx"
  "$BASE/pages/About/[robot]/[robot].tsx"
  "$BASE/pages/Shop.tsx"
  "$BASE/pages/Blog.tsx"
  "$BASE/pages/Contact.tsx"
  "$BASE/pages/Account.tsx"
  "$BASE/pages/Errors/Forbidden.tsx"
  "$BASE/pages/Errors/NotFound.tsx"
  "$BASE/pages/Errors/ServerError.tsx"

  "$BASE/style/index.css"
  "$BASE/style/tailwind.config.js"
)

# 3) 32 style-guide atom/molecule components
components=(
  Accordion.tsx Alert.tsx AvatarGroup.tsx Avatar.tsx Badge.tsx Banner.tsx
  BlogCard.tsx Breadcrumb.tsx Button.tsx Card.tsx Checkbox.tsx Divider.tsx
  Dropdown.tsx Flex.tsx Grid.tsx Input.tsx List.tsx ListItem.tsx Menu.tsx
  Modal.tsx ProductCard.tsx ProgressBar.tsx Radio.tsx Slider.tsx Spinner.tsx
  Switch.tsx Table.tsx TableRow.tsx TableCell.tsx Tag.tsx Toast.tsx Tooltip.tsx
)

echo "🔧 Ensuring directories under '$BASE'…"
for d in "${dirs[@]}"; do
  if [ -d "$d" ]; then
    echo "  [SKIP] $d"
  else
    mkdir -p "$d"
    echo "  [OK]   $d"
  fi
done

echo
echo "📄 Ensuring files under '$BASE'…"
for f in "${files[@]}"; do
  if [ -e "$f" ]; then
    echo "  [SKIP] $f"
  else
    touch "$f"
    echo "  [OK]   $f"
  fi
done

echo
echo "🧩 Ensuring ${#components[@]} components under '$BASE/components'…"
for c in "${components[@]}"; do
  path="$BASE/components/$c"
  if [ -e "$path" ]; then
    echo "  [SKIP] $path"
  else
    touch "$path"
    echo "  [OK]   $path"
  fi
done

echo
echo "✅ Done. Here's the updated tree under app/src (depth=2):"
if command -v tree >/dev/null 2>&1; then
  tree "$BASE" -L 2
else
  find "$BASE" -maxdepth 2 | sed 's|^|   |'
fi
