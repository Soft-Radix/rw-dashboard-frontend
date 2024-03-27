import isUrlInChildren from "@fuse/core/FuseNavigation/isUrlInChildren";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { ListItemButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
  const [items, setItems] = useState(item);
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
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) {
      return;
    }
    const reorderedItems = Array.from(item.children);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);
    setItems({ ...item, children: reorderedItems });
  };
  console.log(items, "items");
  return useMemo(
    () => (
      <Root
        className={clsx(open && "open")}
        itempadding={itempadding}
        sx={item.sx}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="">
            <div>
              <ListItemButton
                component={component}
                className={clsx(
                  "fuse-list-item hover:opacity-100",
                  open ? "opacity-100" : "opacity-80"
                )}
                {...itemProps}
              >
                <div className="flex items-center justify-between w-full  ">
                  <div className="flex items-center gap-10">
                    {item.icon && (
                      <FuseSvgIcon
                        className={clsx(
                          "fuse-list-item-icon shrink-0 ",
                          item.iconClass
                        )}
                        color="action"
                      >
                        {item.icon}
                      </FuseSvgIcon>
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

                    {item.badge && (
                      <FuseNavBadge className="mx-4" badge={item.badge} />
                    )}

                    <IconButton
                      disableRipple
                      className="-mx-12 h-20 w-40 p-0 hover:bg-transparent focus:bg-transparent "
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        setOpen(!open);
                      }}
                      size="large"
                    >
                      <ProjectNavIconArrow
                        className="arrow-icon "
                        color="inherit"
                      >
                        {open
                          ? "heroicons-solid:chevron-down"
                          : "heroicons-solid:chevron-right"}
                      </ProjectNavIconArrow>
                    </IconButton>
                  </div>
                  <div className="flex items-center gap-10">
                    <ProjectNavIcon
                      className="threeDots-icon"
                      color="inherit"
                    />
                    <ProjectPlusIcon />
                  </div>
                </div>
              </ListItemButton>
            </div>
            <div className="">
              {item.children && (
                <Collapse in={open} className="collapse-children">
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {item.children.map((_item, index) => (
                          <Draggable
                            key={_item.id}
                            draggableId={_item.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <FuseNavItem
                                  key={_item.id}
                                  type={`vertical-${_item.type}`}
                                  item={_item}
                                  nestedLevel={nestedLevel + 1}
                                  onItemClick={onItemClick}
                                  checkPermission={checkPermission}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Collapse>
              )}
            </div>
          </div>
        </DragDropContext>
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
