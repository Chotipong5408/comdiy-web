import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removeFiles, uploadFiles } from '../../api/product';
import useEcomStore from '../../store/ecom-store';
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
    const token = useEcomStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (files) {
            let allFiles = form.images;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} ไม่ใช่รูปภาพ`);
                    continue;
                }

                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                allFiles.push(res.data);
                                setForm({
                                    ...form,
                                    images: allFiles,
                                });
                                setIsLoading(false);
                                toast.success('อัพโหลดภาพสำเร็จ!!!');
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsLoading(false);
                            });
                    },
                    'base64'
                );
            }
        }
    };

    const handleDelete = (public_id) => {
        const images = form.images;
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => item.public_id !== public_id);
                setForm({
                    ...form,
                    images: filterImages,
                });
                toast.error(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="my-4">
            <div className="flex mx-4 gap-4 my-4">
                {isLoading && <Loader className="w-16 h-16 animate-spin" />}
                {form.images.map((item, index) => (
                    <div className="relative" key={index}>
                        <img className="w-24 h-24 hover:scale-105" src={item.url} alt="uploaded" />
                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className="absolute top-0 right-0 bg-red-500 p-1 rounded-md cursor-pointer"
                        >
                            X
                        </span>
                    </div>
                ))}
            </div>

            <div className="relative inline-block">
                <label className="block w-full px-4 py-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600">
                    Choose File
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleOnChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </label>
                <span className="ml-2 text-gray-500">No file chosen</span>
            </div>
        </div>
    );
};

export default Uploadfile;
