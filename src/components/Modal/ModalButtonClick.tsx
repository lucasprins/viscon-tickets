import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../../components/Button/Button';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../../components/FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../Icons/IconAlert';
import { IconCheck } from '../Icons/IconCheck';

export enum ModalType {
    CHECK,
    ERROR,
    SUCCESS
}

type ModalProps = {
    type: ModalType
    title: string
    subtitle: string
    text_button_secondary: string
    text_button_primary: string
}

export function Modal({ type, title, subtitle, text_button_secondary, text_button_primary }: ModalProps) {
    

    let [isOpen, setIsOpen] = useState(true)
   // const dispatch = useAppDispatch();

   function closeModal() {
    setIsOpen(false)
  }

   function openModal() {
    setIsOpen(true)
  }

    // Switch (type) search the correct type and gives the empty values the correct values
    //These values will be used to give correct colour & Icon at the button(s)

    let modalTypeStyle = "";
    let modalTypeIcon;
    let modalIcon;
    let modalPrimaryButtonColor;
    switch (type) {
      //Check asks the user if they are sure about choice
        case ModalType.CHECK:
            modalIcon = <IconAlert size='30' color='stroke-primary-500' fill='fill-primary-500' />;
            modalTypeIcon = FeaturedIconType.PRIMARY;
            modalTypeStyle = "py-2.5 px-5 font-semibold";
            modalPrimaryButtonColor = ButtonType.PRIMARY
            break;
      //ERROR is used when error appears or if user is going to quit (premature) without saving it ;)
        case ModalType.ERROR:
            modalIcon = <IconAlert size='30' color='stroke-error-500' fill='fill-error-500' />;
            modalTypeIcon = FeaturedIconType.ERROR;
            modalTypeStyle = "py-2.5 px-4 font-semibold text-sm";
            modalPrimaryButtonColor = ButtonType.SECONDARY_RED;
            break;
        //SUCCES is used when an interaction from user has been succesfull completed. Like sending filled in ticket
        case ModalType.SUCCESS:
            modalIcon = <IconCheck size='30' color='stroke-primary-500' fill='fill-succes-500' />;
            modalTypeIcon = FeaturedIconType.SUCCESS;
            modalTypeStyle = "py-2 px-3.5 font-semibold text-sm";
            modalPrimaryButtonColor = ButtonType.PRIMARY;   
            break;
    }


    return (
      //This button is pure used to trigger the modal
        <>
      <div className="flex items-center justify-center">
      <Button
						size={ButtonSize.LARGE}
						type={ButtonType.PRIMARY}
						text={subtitle}
						width={ButtonWidth.CONTENT}
						onclick={openModal}
				/>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel 
                    className="w-full max-w-md transform 
                    overflow-hidden rounded-2xl bg-white p-6 dark:bg-dark-800 text-middle 
                    align-middle shadow-xl transition-all">

                  <div className="mt-2">
                    <FeaturedIcon
                        type={modalTypeIcon}
                        size={FeaturedIconSize.MD}
                        icon={modalIcon}
                    />

                    <p className="text-gray-900 dark:text-white text-xl font-semibold pt-6">
                      {subtitle}
                    </p>
                  </div>

                  {/* The two buttons who are placed from left to right */}
                  <div className='flex flex-row pt-6'>
                  <Button
                      // Left button
                      size={ButtonSize.MEDIUM}
                      type={ButtonType.SECONDARY_GRAY}
                      text={text_button_secondary}
                      width={ButtonWidth.FULL}
                      onclick={closeModal}
				/>

                  <Button
                        //Right button
                        size={ButtonSize.MEDIUM}
                        type={modalPrimaryButtonColor}
                        text={text_button_primary}
                        width={ButtonWidth.FULL}
                        onclick={closeModal}
				/>
                
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
    )
}