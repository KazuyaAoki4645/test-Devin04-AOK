import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const ProductPerfomance = () => {
  // 月選択用
  const [month, setMonth] = React.useState("1");

  // モーダル開閉用
  const [open, setOpen] = React.useState(false);

  // クリックした行の情報を保持
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  // 行クリック時
  const handleRowClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // モーダル閉じるとき
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <BaseCard
        title="Product Perfomance"
        action={
          <Select
            labelId="month-dd"
            id="month-dd"
            value={month}
            size="small"
            onChange={handleChange}
          >
            <MenuItem value={1}>March 2025</MenuItem>
            <MenuItem value={2}>April 2025</MenuItem>
            <MenuItem value={3}>May 2025</MenuItem>
          </Select>
        }
      >
        <TableContainer
          sx={{
            width: {
              xs: "274px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Assigned
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Priority
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Budget
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  // 行クリックでモーダル表示
                  onClick={() => handleRowClick(product)}
                  hover
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography color="textSecondary" fontSize="13px">
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {product.pname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor: product.pbg,
                        color: "#fff",
                      }}
                      size="small"
                      label={product.priority}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">${product.budget}k</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>

      {/* モーダル */}
{/* モーダル */}
<Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { borderRadius: "12px" } }}>
  <DialogTitle>Product Details</DialogTitle>
  <DialogContent dividers>
    {selectedProduct && (
      <Table
        aria-label="product-details"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableBody>
          {/* ID */}
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize="15px" fontWeight={500}>
                {selectedProduct.id}
              </Typography>
            </TableCell>
          </TableRow>
          {/* Post */}
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Assigned
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight={600}>
                {selectedProduct.name}
              </Typography>
              <Typography color="textSecondary" fontSize="13px">
                {selectedProduct.post}
              </Typography>
            </TableCell>
          </TableRow>
          {/* Product Name */}
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {selectedProduct.pname}
              </Typography>
            </TableCell>
          </TableRow>
          {/* Priority */}
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Priority
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: selectedProduct.pbg,
                  color: "#fff",
                }}
                size="small"
                label={selectedProduct.priority}
              />
            </TableCell>
          </TableRow>
          {/* Budget */}
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Budget
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
                ${selectedProduct.budget}k
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button
      onClick={handleClose}
      variant="contained"
      color="primary"
      startIcon={<CloseIcon />} // アイコン追加
      sx={{
        borderRadius: "8px", // 角丸デザイン
        textTransform: "none", // 大文字化を解除
        px: 3, // 水平方向の余白
        py: 1.2, // 垂直方向の余白
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 影を追加
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
};

export default ProductPerfomance;
