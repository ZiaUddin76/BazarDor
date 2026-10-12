

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200 bg-[#FEFEFA]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-black">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className="text-xs text-black sm:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;