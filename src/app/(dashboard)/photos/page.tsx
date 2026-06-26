// import { getAllPacks } from "@/actions/photos-actions";
// import { Tables } from "@/types/database.types";
import PhotosMain from "@/components/photos/photos-main";
// import { canOpenProPack } from "@/actions/verify-actions";

// type PhotoPack = Tables<'packs'> & {
// 	products: Tables<'products'> | null;
// 	prices: (Tables<'prices'> | null)[] | null;
// };

const PhotosPage = async () => {
  // const packsData = await getAllPacks();

  // if (!Array.isArray(packsData)) {
  //   return (
  //     <div className="p-4 sm:p-6 md:p-8">
  //       <p className="text-center text-red-500">Could not load photo packs.</p>
  //     </div>
  //   );
  // }

  // const canIOpenProPack = await canOpenProPack();
  // const remainingPacks = canIOpenProPack.remaining || 0;
  // const allowed = canIOpenProPack.allowed;

  return (
    <PhotosMain
    // allowed={allowed} remainingPacks={remainingPacks}
    />
  );
};

export default PhotosPage;
