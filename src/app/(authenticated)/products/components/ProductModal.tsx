'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, X, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API or database
const availableMaterials = [
  { id: '1', name: 'Cotton' },
  { id: '2', name: 'Polyester' },
  { id: '3', name: 'Wool' },
  { id: '4', name: 'Silk' },
  { id: '5', name: 'Linen' },
  { id: '6', name: 'Nylon' },
  { id: '7', name: 'Leather' },
  { id: '8', name: 'Denim' },
  { id: '9', name: 'Velvet' },
  { id: '10', name: 'Spandex' },
]

export default function AddProductModal() {
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [materialSearchOpen, setMaterialSearchOpen] = useState(false)

  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the data to your backend
    console.log({
      name: productName,
      description: productDescription,
      price: productPrice,
      materials: selectedMaterials,
    })
    // Reset form and close modal
    setProductName('')
    setProductDescription('')
    setProductPrice('')
    setSelectedMaterials([])
    setOpen(false)
  }

  const handleMaterialChange = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    )
  }

  const removeMaterial = (materialId: string) => {
    setSelectedMaterials(prev => prev.filter(id => id !== materialId))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddProduct}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details of the new product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Materials</Label>
              <div className="col-span-3">
                <Popover open={materialSearchOpen} onOpenChange={setMaterialSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={materialSearchOpen}
                      className="w-full justify-between"
                    >
                      Select materials...
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search materials..." />
                      <CommandEmpty>No material found.</CommandEmpty>
                      <CommandGroup>
                        {availableMaterials.map((material) => (
                          <CommandItem
                            key={material.id}
                            onSelect={() => {
                              handleMaterialChange(material.id)
                              setMaterialSearchOpen(false)
                            }}
                          >
                            <span>{material.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMaterials.map((materialId) => {
                    const material = availableMaterials.find(m => m.id === materialId)
                    return (
                      <Badge key={materialId} variant="secondary">
                        {material?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => removeMaterial(materialId)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}