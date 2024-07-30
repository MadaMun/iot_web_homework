import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import Layout from "../components/layout";
import { Button, Container, Divider, Alert, TextInput, NumberInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Drink, Order } from "../lib/models";
import { useState, useEffect } from "react";

export default function MenuByIdPage() {
  const { drinksId } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const { data: drink, isLoading, error } = useSWR<Drink>(`/drinks/${drinksId}`);
 
  const orderCreateForm = useForm({
    initialValues: {
      drink_id: drinksId || "",
      much: 1,
      note: "",

    },

    validate: {
      drink_id: isNotEmpty("กรุณาระบุชื่อเครื่องดื่ม"),
      much: isNotEmpty("กรุณาระบุจำนวน"),
    },
  });

  useEffect(() => {
    if (drink) {
      const much = orderCreateForm.values.much;
      orderCreateForm.setFieldValue('total_price', much * drink.prics);
    }
  });

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const orderValues = {
        ...values,
        order_date: new Date().toISOString(),
      };
      await axios.post<Order>(`/orders`, orderValues);
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
            title: "เกิดข้อผิดพลาดบางอย่าง",
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
    <Layout>
      <Container className="mt-4">
        {isLoading && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        {!!drink && (
          <>
            <h1>{drink.menu}</h1>
            <p className="italic text-neutral-500 mb-4">ราคา: {drink.prics} บาท</p>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <img
                src={`https://placehold.co/150x200?text=${encodeURIComponent(drink.menu)}`}
                alt={drink.menu}
                className="w-full object-cover aspect-[3/4]"
              />
              <div className="col-span-2 px-4 space-y-2 ">
                <h3>รายละเอียด</h3>
                
                <div className="flex w-full">
                  <div className="flex w-full flex-col">
                    <h3>สถานะ</h3>
                    
                  </div>
                </div>
                <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="space-y-8">
                  <NumberInput
                    label="จำนวน"
                    placeholder="จำนวน"
                    min={1}
                    {...orderCreateForm.getInputProps("much")}
                  />
                  <TextInput
                    label="เพิ่มเติม"
                    placeholder="เพิ่มเติม"
                    {...orderCreateForm.getInputProps("note")}
                  />
                  <Divider />
                  <Button type="submit" loading={isProcessing}>
                    บันทึกข้อมูล
                  </Button>
                </form>
              </div>
            </div>
            <Divider className="mt-4" />
          </>
        )}
      </Container>
    </Layout>
  );
}