import { useContext, useEffect } from "react";
import { useNavigate,useParams } from "react-router";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../componenets/productTile";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    productDetails,
    setProductDetails,
    setLoading,
    loading,
    handleAddToCart,
    // cartItems
  } = useContext(ShoppingCartContext);

  async function FetchProductDetails() {
    const responce = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await responce.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }
  useEffect(() => {
    FetchProductDetails();
  }, [id]);

  //   function handleGotoCart(){
  //     navigate('/cart');
  //   }

  if (loading) {
    <h1>Please wait a moment</h1>;
  }
  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4l mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 px-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={productDetails?.thumbnail}
                alt={productDetails?.ProductTile}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {productDetails?.images?.length
                ? productDetails?.images.map((imageitem) => (
                    <div key={imageitem} className="rounded-xl p-4 shadow-md">
                      <img
                        src={imageitem}
                        alt="product secondry image"
                        className="w-24 cursor-pointer"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333333]">
              {productDetails?.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold">${productDetails?.price}</p>
            </div>
            <div>
              <button
              // disabled={cartItems.findIndex(item=>item.id===productDetails.id) > -1 }
                onClick={()=> handleAddToCart(productDetails)}
                className="mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent  text-sm  font-semibold rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
