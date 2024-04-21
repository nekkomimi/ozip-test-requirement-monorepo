export function formatRupiah(value?: number) {
    // if(!value) {
    //     return '';
    // }
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
    return formatter.format(value ?? 0);
}

export function parseRupiah(value?: string): any {
    if (!value) return "";
    const unformatted = value
        .replace(/[Rp. ]/g, "")
        .replace(/[,.]/g, ".")
        .replace(/\s/g, "");
    return Number.parseFloat(unformatted);
}
