import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import ProductInfo from "@components/wearly/ProductInfo/ProductInfo";
import useOrder from "@hooks/useOrder";

import { Table, Modal } from "react-bootstrap";

const Orders = () => {
  const {
    showModal,
    closeModalHandler,
    selectedProduct,
    loading,
    error,
    orderList,
    viewDetailsHandler,
  } = useOrder();

  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Ваш заказ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              img={el.img}
              title={el.title}
              price={el.price}
              direction="column"
              quantity={el.quantity}
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading>Мои заказы</Heading>
      <Loading loading={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Количество</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td># {el.id}</td>
                <td>
                  {el.items.length}
                  {" / "}
                  <span
                    onClick={() => viewDetailsHandler(el.id)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Детали
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
