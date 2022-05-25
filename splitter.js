function main() {
	const myStr = "0.0.2520793@1653367026.83946799";

	const a = myStr.split("@");
	const b = a[1].split(".");
	return `${a[0]}-${b[0]}-${b[1]}`;
}
main();
