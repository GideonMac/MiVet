USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Select_ByCreatedBy]    Script Date: 11/23/2022 3:33:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 16 2022
-- Description: Get all records by user Id from dbo.Inventory
-- Code Reviewer: Victoria Sanchez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Select_ByCreatedBy]
				@UserId int
				,@PageIndex int
				,@PageSize int

AS

/*
--------- TEST CODE ----------
DECLARE @UserId int = 75
		,@PageIndex int = 0
		,@PageSize int = 5

EXECUTE dbo.Inventory_Select_ByCreatedBy
		@UserId 
		,@PageIndex
		,@PageSize

SELECT *
FROM dbo.Inventory
*/

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT i.[Id]
      ,i.[Quantity]
      ,i.[BasePrice]
      ,p.[Id] AS ProductId
      ,p.[Name] AS ProductName
      ,p.[SKU] AS ProductSKU
      ,p.[Year] AS ProductYear
      ,p.[Manufacturer] AS ProductManufacturer
      ,p.[Description] AS ProductDesc  
      ,pt.[Id] AS ProductTypeId
      ,pt.[Name] AS ProductType
      ,v.[Id] AS VendorId
      ,v.[Name] AS Vendor
      ,v.[Description] AS VendorDesc
      ,v.[Headline] AS VendorHeadline
      ,i.[VetId]
      ,i.[IsActive]
      ,i.[DateCreated]
      ,i.[DateModified]
      ,i.[CreatedBy]
      ,i.[ModifiedBy]
	  , TotalCount = COUNT(1) OVER()
FROM	dbo.Inventory AS i
		inner join dbo.Products AS p
		ON i.ProductId = p.Id
		inner join dbo.ProductType AS pt
		ON p.ProductTypeId = pt.Id
		inner join dbo.Vendors AS v
		ON p.VendorId = v.Id

WHERE (i.[CreatedBy] = @UserId AND i.IsActive = 1)

ORDER BY i.Id

	OFFSET @offset Rows
	Fetch Next @PageSize Rows ONLY

END
GO
