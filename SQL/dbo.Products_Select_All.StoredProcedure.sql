USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Products_Select_All]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Gideon Macapagal
-- Create date: October 20, 2022
-- Description: Get product info by Id.
-- Code Reviewer: Zachary Frappier

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Products_Select_All]
			@PageIndex int
			,@PageSize int
AS

/*
--------- TEST CODE ----------
DECLARE @PageIndex int = 1
		,@PageSize int = 1

EXECUTE dbo.Products_Select_All @PageIndex 
							  ,@PageSize 
SELECT *
FROM dbo.Products
*/

BEGIN


	DECLARE @offset int = @PageIndex * @PageSize

	SELECT p.[Id]
      ,p.[SKU]
      ,p.[Name]
      ,p.[Manufacturer]
      ,p.[Year]
      ,p.[Description]
      ,p.[Specifications]
	  ,pt.[Id] AS ProductTypeId
      ,pt.[Name] AS ProductType
	  ,v.[Id] AS VendorId
      ,v.[Name] AS Vendor
	  ,v.[Description] AS VendorDesc
	  ,v.[Headline] AS VendorHeadline
      ,p.[IsVisible]
      ,p.[IsActive]
      ,p.[PrimaryImage]
      ,p.[DateCreated]
      ,p.[DateModified]
      ,p.[CreatedBy]
      ,p.[ModifiedBy]
	  , TotalCount = COUNT(1) OVER()
	FROM dbo.Products AS p
		 inner join dbo.ProductType AS pt
		 ON p.ProductTypeId = pt.Id
		 inner join dbo.Vendors AS v
		 ON p.VendorId = v.Id
	WHERE p.[IsActive] = 1

	ORDER BY p.Id

	OFFSET @offset Rows
	Fetch Next @PageSize Rows ONLY


END
GO
