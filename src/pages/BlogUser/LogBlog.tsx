import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { useAppDispatch } from "../../hooks/appHooks";
import { deleteBloglAction } from "../../store/actions/blog.action";
const LogBlog = ({ isOpen, onClose, item, getListBlog }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const deleteBlog = async (id: any) => {
    const res = await dispatch(deleteBloglAction(id));
    if (res.meta.requestStatus === "fulfilled") {
      console.log("🚀 ~ deleteBlog ~ res:", res);
      onClose();
      getListBlog();
      toast({
        title: "Xoá Success",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Xoá không Success",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xoá Blog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="">
            Bạn có muốn xoá Blog{" "}
            <span className="font-semibold text-red-500">
              {item?.title && parse(item?.title)}
            </span>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Đóng
          </Button>
          <Button
            bg="#FF6636"
            mr={3}
            onClick={() => deleteBlog(item?._id)}
            color="white"
          >
            Xoá
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogBlog;
