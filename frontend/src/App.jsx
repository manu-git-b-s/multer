import { useFormik } from "formik";
// import axiosInstance from "./axiosInstance";

const App = () => {
  const formik = useFormik({
    initialValues: { username: "", file: "" },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("file", values.file);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Handle success
        console.log("File uploaded successfully");
      } catch (error) {
        // Handle error
        console.error("Error uploading file:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="border-2 rounded-md border-slate-500 w-[500px] h-[500px] flex flex-col justify-center items-center">
        <label className="text-black text-3xl">Username</label>
        <input
          type="text"
          className="py-4 px-2 bg-slate-100 rounded-md text-2xl"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          type="file"
          className="mt-3"
          id="file"
          name="file"
          onChange={(event) => {
            formik.setFieldValue("file", event.currentTarget.files[0]);
          }}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-slate-600 text-white"
          onClick={formik.handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
