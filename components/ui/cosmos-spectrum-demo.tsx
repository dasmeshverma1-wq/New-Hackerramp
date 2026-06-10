import { CosmicSpectrum } from "@/components/ui/cosmos-spectrum"

export default function CosmosSpectrumDemo() {
  return (
    <div className="min-h-screen bg-black">
      <CosmicSpectrum
        color="wit"
        blur
        title="Women in Tech"
        subtitle={"Where leadership becomes community\nAcross Myntra"}
      />
    </div>
  )
}
