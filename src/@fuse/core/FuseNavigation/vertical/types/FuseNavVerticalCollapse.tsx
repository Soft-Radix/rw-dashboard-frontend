import isUrlInChildren from "@fuse/core/FuseNavigation/isUrlInChildren";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { ListItemButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import IconButton from "@mui/material/IconButton";
import List, { ListProps } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material/styles";
import clsx from "clsx";
import type { Location } from "history";
import {
  ProjectNavIcon,
  ProjectNavIconArrow,
  ProjectPlusIcon,
} from "public/assets/icons/projectsIcon";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import FuseSvgIcon from "../../../FuseSvgIcon";
import FuseNavBadge from "../../FuseNavBadge";
import FuseNavItem, { FuseNavItemComponentProps } from "../../FuseNavItem";
import { FuseNavItemType } from "../../types/FuseNavItemType";

type ListComponentProps = ListProps & {
  itempadding: number;
};

const Root = styled(List)<ListComponentProps>(({ theme, ...props }) => ({
  padding: 0,
  "&.open": {},
  "& > .fuse-list-item": {
    minHeight: 44,
    width: "100%",
    borderRadius: "6px",
    margin: "0 0 4px 0",
    backgroundColor: "red",
    paddingRight: 16,
    paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
    paddingTop: 10,
    paddingBottom: 10,

    color: alpha(theme.palette.text.primary, 0.7),
    "&:hover": {
      color: theme.palette.text.primary,
    },

    "& > .fuse-list-item-icon": {
      marginRight: 30,
      color: "inherit",
    },
  },
}));

function needsToBeOpened(location: Location, item: FuseNavItemType) {
  return location && isUrlInChildren(item, location.pathname);
}

/**
 * FuseNavVerticalCollapse component used for vertical navigation items with collapsible children.
 */
function FuseNavVerticalCollapse(props: FuseNavItemComponentProps) {
  const location = useLocation();
  const { item, nestedLevel = 0, onItemClick, checkPermission } = props;
  // console.log(item, "item");
  const [items, setItems] = useState<any>(item);
  // console.log(items, "ghdjh");
  const [open, setOpen] = useState(() => needsToBeOpened(location, item));

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  useEffect(() => {
    if (needsToBeOpened(location, item)) {
      if (!open) {
        setOpen(true);
      }
    }
    // eslint-disable-next-line
  }, [location, item]);

  const component = item.url ? NavLinkAdapter : "li";

  let itemProps = {};

  if (typeof component !== "string") {
    itemProps = {
      disabled: item.disabled,
      to: item.url,
      end: item.end,
      role: "button",
    };
  }

  if (checkPermission && !item?.hasPermission) {
    return null;
  }
  // const reorder = (items: any, startIndex: number, endIndex: number) => {
  //   const newData = Array.from(items);
  //   const [removed] = newData.splice(startIndex, 1);
  //   newData.splice(endIndex, 0, removed);
  //   console.log(newData, "nd");
  //   return newData;
  // };
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const newItems = [...items.children];
    // console.log(newItems, "anw");
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    // console.log(newItems, "nw");
    setItems({ ...items, children: newItems });
  };
  // console.log(items, "newItem");
  return useMemo(
    () => (
      <Root
        className={clsx(open && "open")}
        itempadding={itempadding}
        sx={item.sx}
      >
        <div>
          <div>
            <ListItemButton
              component={component}
              className={clsx(
                "fuse-list-item hover:opacity-100",
                open
                  ? "opacity-100 bg-[#393F4C] "
                  : "opacity-100  bg-[#393f4c00]"
              )}
              {...itemProps}
            >
              <div
                className="flex items-center justify-between w-full "
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  setOpen(!open);
                }}
              >
                <div className="flex items-center">
                  {item.icon && (
                    // <FuseSvgIcon
                    //   className="mr-[0.8rem]"
                    //   color="action"
                    // >
                    //   {item.icon}
                    // </FuseSvgIcon>
                    <span
                      className={clsx(
                        "shrink-0 inline-block mr-16",
                        item.iconClass
                      )}
                    >
                      {item.customIcon}
                    </span>
                  )}

                  <ListItemText
                    className="fuse-list-item-text"
                    primary={item.title}
                    secondary={item.subtitle}
                    classes={{
                      primary:
                        "text-13 font-medium fuse-list-item-text-primary truncate",
                      secondary:
                        "text-11 font-medium fuse-list-item-text-secondary leading-normal truncate",
                    }}
                  />

                  {items.badge && (
                    <FuseNavBadge className="mx-4" badge={item.badge} />
                  )}

                  <IconButton
                    disableRipple
                    // className="w-40 h-20 p-0 -mx-12 hover:bg-transparent focus:bg-transparent "
                    size="large"
                  >
                    <ProjectNavIconArrow
                      // className="arrow-icon"
                      color="inherit"
                    >
                      {open
                        ? "heroicons-solid:chevron-down"
                        : "heroicons-solid:chevron-right"}
                    </ProjectNavIconArrow>
                  </IconButton>
                </div>
                {/* {!items?.hideOption &&
                  <div className="flex items-center gap-10">
                    <ProjectNavIcon className="threeDots-icon" color="inherit" />
                    <ProjectPlusIcon />
                  </div>
                } */}
              </div>
            </ListItemButton>
          </div>

          {items.children && (
            <Collapse in={open} className="collapse-children">
              {item.children.map((_item) => (
                <FuseNavItem
                  key={_item.id}
                  type={`vertical-${_item.type}`}
                  item={_item}
                  nestedLevel={nestedLevel + 1}
                  onItemClick={onItemClick}
                  checkPermission={checkPermission}
                />
              ))}
            </Collapse>
          )}
        </div>
      </Root>
    ),
    [
      item.badge,
      item.children,
      item.icon,
      item.iconClass,
      item.title,
      item.url,
      itempadding,
      nestedLevel,
      onItemClick,
      open,
    ]
  );
}

const NavVerticalCollapse = FuseNavVerticalCollapse;

export default NavVerticalCollapse;
