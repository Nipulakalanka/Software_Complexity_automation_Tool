import axios from "../configs/axios";

function FloatingButton() {
  const onDownloadHanlder = () => {
    console.log("CLICKE");
    axios
      .get("/download")
      .then((res) => {
        var data = new Blob([res.data]);
        if (typeof window.navigator.msSaveBlob === "function") {
          // If it is IE that support download blob directly.
          window.navigator.msSaveBlob(data, "data.js");
        } else {
          var blob = data;
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "data.js";

          document.body.appendChild(link);
          link.click(); // create an <a> element and simulate the click operation.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10  cursor-pointer"
      onClick={onDownloadHanlder}
    >
      <div>
        <p
          title="Download Refactored Code"
          className="block w-12 h-12 md:w-16 md:h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
        >
          <img
            className="object-cover object-center w-full h-full rounded-full"
            src="https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_960_720.png"
            alt="floting button "
          />
        </p>
      </div>
    </div>
  );
}

export default FloatingButton;
