/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { RowPropGetter, TableRowProps, Cell } from "react-table";
import Collapse from "../../Collapse";
import Modal from "react-modal";
import Icon from "../../Icon";
import { getStyles } from "../utils";
import imagePlaceholder from "assets/images/placeholders/image.jpg";

const cellProps = (props: any, { cell }: any) =>
  getStyles(props, cell.column.align, cell.column.maxWidth);

export interface TableRow {
  id: string;
  getRowProps: (propGetter?: RowPropGetter<object>) => TableRowProps;
  cells: Cell<object>[];
  expandable?: boolean;
  isExpanded?: boolean;
  onPress?: Function;
  renderExpanded?: React.ReactNode;
}

const cellKey = (cell: Cell<object>) =>
  `table_cell_${cell.column.id}_${cell.row.id}_${JSON.stringify(cell.value)}`;

export class Row extends React.Component<TableRow, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      imageOver: false,
      imageOpened: false,
      pos: null,
    };
  }

  onPress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { onPress, ...props } = this.props;
    if (typeof onPress === "function") onPress(props, e);
  };

  handleImageHover(e: any, value: any) {
    const { imageOver } = this.state;
    if (imageOver) {
      this.setState({ imageOver: null });
    } else {
      this.setState({
        imageOver: value,
        pos: { x: e.clientX + 15, y: e.clientY + 15 },
      });
    }
  }

  renderImagePopOver() {
    const { imageOver, pos } = this.state;
    if (!imageOver || !pos) return null;

    // const { borderRadius, productSize } = settings.design.overall;

    return (
      <div
        className="mouseOverImage"
        style={{
          backgroundImage: `url(${imageOver})`,
          left: pos.x,
          top: pos.y,
          width: 200,
          height: 200,
          borderRadius: 1,
        }}
      />
    );
  }

  renderImageModal() {
    const { imageOpened } = this.state;

    return (
      <Modal
        isOpen={imageOpened}
        onRequestClose={() => {
          this.setState({ imageOpened: false });
        }}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            background: "transparent",
            border: "none",
            borderRadius: "10px",
          },
          overlay: {
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        // contentLabel="Modal"
      >
        <div
          className="Modal"
          style={{
            backgroundImage: `url(${imageOpened})`,
            border: "10px solid transparent",
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Modal>
    );
  }

  renderCell = (cell: any) => {
    const { imageOver } = this.state;

    const imageStyles = {
      backgroundImage: `url(${cell.value || imagePlaceholder})`,
      height: "40px",
      width: "40px",
      borderRadius: "1",
    } as any;
    if (!cell.value) imageStyles.cursor = "auto";

    return (
      <div
        {...(cell.getCellProps(cellProps) as {})}
        key={cellKey(cell)}
        className="TableData"
      >
        {cell.column.id !== "actions" && typeof cell.value === "boolean" ? (
          cell.value ? (
            <Icon name="correct-symbol" />
          ) : (
            <Icon name="close" />
          )
        ) : (cell.column as any).type === "image" ? (
          <div
            className="hasImage"
            style={imageStyles}
            onMouseOver={(e) => {
              if (!imageOver) this.handleImageHover(e, cell.value);
            }}
            onMouseLeave={(e) => {
              if (imageOver) this.handleImageHover(e, cell.value);
            }}
            onClick={() => {
              this.setState({ imageOpened: cell.value });
            }}
          />
        ) : cell.column?.id === "row_actions" ? (
          cell.render("Cell")
        ) : (
          <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: cell.column.align || 'left' }}>{cell.render("Cell")}</span>
        )}
      </div>
    );
  };

  renderExpanded() {
    const { expandable, isExpanded, renderExpanded } = this.props;

    if (!expandable || typeof renderExpanded !== "function") return;

    return (
      <Collapse
        expandedChildren={renderExpanded(this.props)}
        expanded={isExpanded}
      />
    );
  }

  render() {
    const { getRowProps, cells, onPress, isExpanded } = this.props;
    const hasOnPress = typeof onPress === "function";

    return (
      <React.Fragment>
        <div
          {...(getRowProps() as {})}
          className={`TableRow${hasOnPress ? " __clickable" : ""}${isExpanded ? " __expanded" : ""}`}
          onClick={this.onPress}
        >
          {cells.map(this.renderCell)}
        </div>
        {this.renderExpanded()}
        {this.renderImagePopOver()}
        {this.renderImageModal()}
      </React.Fragment>
    );
  }
}
