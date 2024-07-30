import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Container, Divider, NumberInput, TextInput, } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Drink } from "../lib/models";

export default function DrinkCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const drinkCreateForm = useForm({
    initialValues: {
      menu: "",
      prics: 1,
    },

    validate: {
      // menu: isNotEmpty("กรุณาระบุเมนู"),
      // prics: isNotEmpty("กรุณาระบุราคา"),
    },
  });

  const handleSubmit = async (values: typeof drinkCreateForm.values) => {
    try {
      setIsProcessing(true);
      await axios.post<Drink>(`/drinks`, values);
      notifications.show({
        title: "เพิ่มข้อมูลเครื่องดื่มสำเร็จ",
        message: "ข้อมูลเครื่องดื่มได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/drinks`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง2",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">เพิ่มเครื่องดื่มในระบบ</h1>

          <form onSubmit={drinkCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="Name"
              placeholder="Name"
              {...drinkCreateForm.getInputProps("menu")}
            />

            <NumberInput
              label="prices"
              placeholder="prices"
              {...drinkCreateForm.getInputProps("prics")}
            />
            <Divider />

            <Button type="submit" loading={isProcessing}>
              บันทึกข้อมูล
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
