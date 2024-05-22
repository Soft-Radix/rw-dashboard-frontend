import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { alpha, styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  ListItemButton,
  ListItemButtonProps,
  Popover,
  Typography,
} from "@mui/material";
import FuseNavBadge from "../../FuseNavBadge";
import FuseSvgIcon from "../../../FuseSvgIcon";
import { FuseNavItemComponentProps } from "../../FuseNavItem";
import { ProjectNavIcon } from "public/assets/icons/projectsIcon";
import { getLocalStorage } from "src/utils";
import LongMenu from "../../../../../../src/app/components/Dropdown";
import dotImg from "../../../../../../public/assets/icons/dots.svg";
import DropdownMenu from "../../../../../../src/app/components/Dropdown";
import { DeleteIcon, EditIcon } from "public/assets/icons/navabarIcon";
import DeleteClient from "src/app/components/client/DeleteClient";
import DeleteProject from "src/app/pages/projects/DeleteProject";
import { deleteProject } from "app/store/Projects";
import toast from "react-hot-toast";

type ListItemButtonStyleProps = ListItemButtonProps & {
  itempadding: number;
};

const Root = styled(ListItemButton)<ListItemButtonStyleProps>(
  ({ theme, ...props }) => ({
    minHeight: 44,
    width: "100%",
    // borderRadius: "6px",
    margin: "0 0 4px 0",
    paddingRight: 16,
    paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
    paddingTop: 10,
    paddingBottom: 10,
    color: alpha(theme.palette.text.primary, 1),
    cursor: "pointer",
    textDecoration: "none!important",
    "&:hover": {
      color: "white",
    },
    "&.active": {
      color: "theme.palette.text.primary",
      backgroundColor: "#393F4C",
      pointerEvents: "none",
      transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
      "& > .fuse-list-item-text-primary": {
        color: "inherit",
      },
      "& > .fuse-list-item-icon": {
        color: "inherit",
      },
    },
    "& >.fuse-list-item-icon": {
      marginRight: 16,
      color: "inherit",
    },
    "& > .fuse-list-item-text": {},
  })
);

/**
 * FuseNavVerticalItem is a React component used to render FuseNavItem as part of the Fuse navigational component.
 */
function FuseNavVerticalItem(props: FuseNavItemComponentProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [deleteid, setDeleteId] = useState();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const userDetail = getLocalStorage("userDetail");
  const { item, nestedLevel = 0, onItemClick, checkPermission } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  const component = item.url ? NavLinkAdapter : "li";

  let itemProps = {};

  if (typeof component !== "string") {
    itemProps = {
      disabled: item.disabled,
      to: item.url || "",
      end: item.end,
      role: "button",
    };
  }

  if (checkPermission && !item?.hasPermission) {
    return null;
  }

  const onDelete = async () => {
    alert("Delete");
    setDeleteId(null);
    try {
      const payload = {
        project_id: deleteid,
      };
      console.log("🚀 ~ onDelete ~ payload.deleteid:", payload.deleteid);
      //@ts-ignore
      const res = await dispatch(deleteProject(payload));

      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return useMemo(
    () => (
      <Root
        component={component}
        className={clsx("fuse-list-item", item.active && "active")}
        onClick={() => onItemClick && onItemClick(item)}
        itempadding={itempadding}
        sx={item.sx}
        {...itemProps}
      >
        {item.icon && (
          <div>
            {/* <FuseSvgIcon
              className={clsx("fuse-list-item-icon shrink-0", item.iconClass)}
            // color="action"
            >
              {item.icon}
            </FuseSvgIcon> */}
            <span
              className={clsx("shrink-0 inline-block mr-16", item.iconClass)}
            >
              {item.customIcon}
            </span>
          </div>
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          secondary={item.subtitle}
          classes={{
            primary: "text-13 font-medium fuse-list-item-text-primary truncate",
            secondary:
              "text-11 font-medium fuse-list-item-text-secondary leading-normal truncate",
          }}
        />
        <DeleteProject
          isOpen={isOpenDeletedModal}
          setIsOpen={setIsOpenDeletedModal}
          onDelete={onDelete}
        />
        {item?.isProject && (
          <>
            <Button aria-describedby={id} onClick={handleClick}>
              <ProjectNavIcon className="threeDots-icon" color="inherit" />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div>
                <Typography
                  sx={{
                    p: 2,
                    backgroundColor: "white",
                    color: "black",
                    width: "164px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Edit <EditIcon />
                </Typography>
              </div>

              <div
                onClick={() => {
                  setIsOpenDeletedModal(true);
                  setDeleteId(id);
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    backgroundColor: "white",
                    color: "black",
                    width: "164px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Delete <DeleteIcon />
                </Typography>
              </div>
            </Popover>
          </>
        )}
        {item.badge && <FuseNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick, anchorEl]
  );
}

const NavVerticalItem = FuseNavVerticalItem;

export default NavVerticalItem;
