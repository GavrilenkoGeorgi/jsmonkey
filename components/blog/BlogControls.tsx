import { FC } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Select,
  SelectValue,
} from "react-aria-components";
import styles from "./BlogControls.module.sass";

export type BlogFilters = {
  sortKey: string;
  tagFilter: string;
  searchQuery: string;
};

export const defaultFilters: BlogFilters = {
  sortKey: "date-desc",
  tagFilter: "",
  searchQuery: "",
};

type BlogControlsProps = {
  availableTags: string[];
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
};

const sortOptions = [
  { id: "date-desc", label: "Newest first" },
  { id: "date-asc", label: "Oldest first" },
  { id: "title-asc", label: "Title A-Z" },
  { id: "title-desc", label: "Title Z-A" },
];

const BlogControls: FC<BlogControlsProps> = ({
  availableTags,
  filters,
  onFiltersChange,
}) => {
  const { sortKey, tagFilter, searchQuery } = filters;
  const update = (patch: Partial<BlogFilters>) =>
    onFiltersChange({ ...filters, ...patch });
  const isDirty =
    sortKey !== defaultFilters.sortKey ||
    tagFilter !== defaultFilters.tagFilter ||
    searchQuery !== defaultFilters.searchQuery;
  const tagOptions = [
    { id: "", label: "All tags" },
    ...availableTags.map((t) => ({ id: t, label: `#${t}` })),
  ];

  return (
    <div className={styles.controls}>
      <SearchField
        className={styles.searchField}
        value={searchQuery}
        onChange={(v) => update({ searchQuery: v })}
        aria-label="Search posts"
      >
        <Label className={styles.searchLabel}>Search</Label>
        <Input className={styles.searchInput} placeholder="Search by title…" />
        {searchQuery && (
          <Button className={styles.clearBtn} aria-label="Clear search">
            ✕
          </Button>
        )}
      </SearchField>

      <Select
        className={styles.selectWrapper}
        value={sortKey}
        onChange={(key) => update({ sortKey: String(key) })}
        aria-label="Sort posts"
      >
        <Label className={styles.selectLabel}>Sort by</Label>
        <Button className={styles.selectTrigger}>
          <SelectValue className={styles.selectValue} />
          <span aria-hidden="true" className={styles.selectArrow}>
            ▼
          </span>
        </Button>
        <Popover className={styles.popover}>
          <ListBox className={styles.listBox}>
            {sortOptions.map((opt) => (
              <ListBoxItem key={opt.id} id={opt.id} className={styles.option}>
                {opt.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>

      <Select
        className={styles.selectWrapper}
        value={tagFilter}
        onChange={(key) => update({ tagFilter: String(key) })}
        aria-label="Filter by tag"
      >
        <Label className={styles.selectLabel}>Tag</Label>
        <Button className={styles.selectTrigger}>
          <SelectValue className={styles.selectValue} />
          <span aria-hidden="true" className={styles.selectArrow}>
            ▼
          </span>
        </Button>
        <Popover className={styles.popover}>
          <ListBox className={styles.listBox}>
            {tagOptions.map((opt) => (
              <ListBoxItem key={opt.id} id={opt.id} className={styles.option}>
                {opt.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>

      {isDirty && (
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => onFiltersChange(defaultFilters)}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default BlogControls;
