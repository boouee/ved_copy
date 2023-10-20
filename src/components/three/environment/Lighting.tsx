export default function Lighting() {
  return (
    <>
      <ambientLight args={[0xffffff, 1]} />
      <color attach="background" args={[0.05, 0.05, 0.05]} />
    </>
  );
}
