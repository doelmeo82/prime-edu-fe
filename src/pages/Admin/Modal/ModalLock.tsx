import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectDelete, selectDisable } from '../../../store/reducers/adminSlice';
import { useAppDispatch } from '../../../hooks/appHooks';
import { changeStatus } from '../../../store/actions/admin.action';
const ModalLock = ({ isOpen, onClose, id, getAccountStudentList,fullname }: any) => {
  const isDisable = useSelector(selectDisable);
  const isDelete = useSelector(selectDelete);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const blockHandle = async () => {
    const payload = {
      id: id,
      isDisabled: isDisable,
      isDeleted: isDelete,
    };
    const res = await dispatch(changeStatus(payload));
    if (res.payload && res.meta.requestStatus === 'fulfilled') {
      setIsLoading(false);
      onClose();
      setTimeout(await getAccountStudentList(), 500);
    }
  };
  const handleSwitchButton = () => {
    setIsLoading(true);
    blockHandle();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isDisable ? 'Khóa' : 'Mở'} người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            Bạn có chắc là muốn {isDisable ? 'khóa' : 'mở'} người dùng có tên là{' '}
            <span className={`font-medium ${isDisable ? 'text-red-500' : 'text-green-500'}`}>{fullname}</span>
          </p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Đóng
          </Button>
          <Button
            colorScheme={isDisable ? 'red' : 'green'}
            onClick={handleSwitchButton}
            isLoading={isLoading}
          >
            {isDisable ? 'Khóa' : 'Mở'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLock;
