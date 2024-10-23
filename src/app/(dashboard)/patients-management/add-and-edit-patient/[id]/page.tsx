"use client"
import React, { useEffect, useState } from 'react'
import AddAndEditPatientComponent from '../../components/AddAndEditPatientComponent'
import { getPatientDataById } from '@/services/patient.service'

const AddAndEditPatients = ({params}:{params:{id:string}}) => {
  const [patientData, setPatientData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPatientData = async () => {
    try {
      setIsLoading(true)
      const res = await getPatientDataById(params.id)
      console.log("Fetched patient data:", res)
      setPatientData(res)
    } catch (error) { 
      console.error("Error fetching patient data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPatientData()
  }, [params.id])

  if (isLoading) {
    return <div>Loading patient data...</div>
  }


  return (
    <div className='mt-10'>
      <AddAndEditPatientComponent data={patientData} />
    </div>
  )
}

export default AddAndEditPatients

