// import { useNavigate } from "react-router-dom";
// import Layout from "../components/layout";
// import { Button, Container, Divider, NumberInput, Select, TextInput } from "@mantine/core";
// import { isNotEmpty, useForm } from "@mantine/form";
// import { useState} from "react";
// import useSWR from "swr";
// import axios, { AxiosError } from "axios";
// import { notifications } from "@mantine/notifications";
// import { Drink } from "../lib/models";

// export default function DrinkCreatePage() {
//   const navigate = useNavigate();

//   const [isProcessing, setIsProcessing] = useState(false);
//   const { data: drink} = useSWR<Drink>(`/drinks`);
//   const drinkCreateForm = useForm({
//     initialValues: {
//       menu: "",
//       pries: 1,
//     },

//     validate: {
//       menu: isNotEmpty("กรุณาระบุเมนู"),
//       pries: isNotEmpty("กรุณาระบุราคา"),
//     },
//   });

//   const handleSubmit = async (values: typeof drinkCreateForm.values) => {
//     try {
//       setIsProcessing(true);
//       // const response = await axios.post<Drink>(`/drinks`);
//       notifications.show({
//         title: "เพิ่มข้อมูลหนังสือสำเร็จ",
//         message: "ข้อมูลเมนูได้รับการเพิ่มเรียบร้อยแล้ว",
//         color: "teal",
//       });
//       navigate(`/drinks`);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 422) {
//           notifications.show({
//             title: "ข้อมูลไม่ถูกต้อง",
//             message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
//             color: "red",
//           });
//         } else if (error.response?.status || 500 >= 500) {
//           notifications.show({
//             title: "เกิดข้อผิดพลาดบางอย่าง1asdasdas",
//             message: "กรุณาลองใหม่อีกครั้ง",
//             color: "red",
//           });
//         }
//       } else {
//         notifications.show({
//           title: "เกิดข้อผิดพลาดบางอย่าง2asasd3",
//           message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
//           color: "red",
//         });
//       }
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <Layout>
//         <Container className="mt-8">
//           <h1 className="text-xl">เพิ่มเมนูนระบบ</h1>

//           <form onSubmit={drinkCreateForm.onSubmit(handleSubmit)} className="space-y-8">
//             <TextInput
//               label="name"
//               placeholder="name"
//               {...drinkCreateForm.getInputProps("menu")}
//             />
//             <NumberInput
//               label="pries"
//               placeholder="pries"
//               {...drinkCreateForm.getInputProps("pries")}
//             />
            
//             <Divider />
//             <Button type="submit" loading={isProcessing}>
//               บันทึกข้อมูล
//             </Button>
//           </form>
//         </Container>
//       </Layout>
//     </>
//   );
// }
